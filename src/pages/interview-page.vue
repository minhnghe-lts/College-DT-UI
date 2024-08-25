<script setup lang="ts">
import {
  Candidate,
  Interview,
  InterviewResult,
  MeetingRoom,
} from "@/models/interview";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceList from "@fullcalendar/list";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import FullCalendar from "@fullcalendar/vue3";
import axios from "axios";
import { onMounted, ref } from "vue";
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VDialog,
  VSelect,
  VTextField,
} from "vuetify/components";

const interviews = ref<Interview[]>([]);
const candidates = ref<Candidate[]>([]);
const meetingRooms = ref<MeetingRoom[]>([]);
const isDialogOpen = ref(false);

const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);

const fetchData = async () => {
  try {
    const [candidatesResponse, interviewsResponse, meetingRoomsResponse] =
      await Promise.all([
        axios.get<Candidate[]>("https://localhost:7106/api/candidate"),
        axios.get<Interview[]>("https://localhost:7106/inteview"),
        axios.get<MeetingRoom[]>("https://localhost:7106/meetingRooms"),
      ]);

    candidates.value = candidatesResponse.data;
    interviews.value = interviewsResponse.data || [];
    meetingRooms.value = meetingRoomsResponse.data || [];

    updateCalendarEvents();
    updateCalendarResources();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const openDialog = (info: any) => {
  const interview = findInterviewById(info.event.id);
  if (interview) {
    selectedInterview.value = interview;
    isDialogOpen.value = true;
  }
};

const createNewInterview = (info: any) => {
  selectedInterview.value = {
    ...getEmptyInterview(),
    fromTime: info.date,
    toTime: new Date(info.date.getTime() + 60 * 60 * 1000),
    meetingRoomId: parseInt(info.resource.id),
  };
  isDialogOpen.value = true;
};

const saveInterview = async () => {
  try {
    if (selectedInterview.value.id && !isNaN(selectedInterview.value.id)) {
      await axios.put(
        `https://localhost:7106/inteview/${selectedInterview.value.id}`,
        selectedInterview.value
      );
      updateEventInCalendar(selectedInterview.value);
    } else {
      const response = await axios.post(
        "https://localhost:7106/inteview",
        selectedInterview.value
      );
      addEventToCalendar(response.data);
    }
  } catch (error) {
    console.error("Failed to save interview:", error);
  } finally {
    isDialogOpen.value = false;
    resetSelectedInterview();
  }
};

const deleteInterview = async () => {
  try {
    if (selectedInterview.value.id && !isNaN(selectedInterview.value.id)) {
      await axios.delete(
        `https://localhost:7106/inteview/${selectedInterview.value.id}`
      );
      removeEventFromCalendar(selectedInterview.value.id);
    }
  } catch (error) {
    console.error("Failed to delete interview:", error);
  } finally {
    isDialogOpen.value = false;
    resetSelectedInterview();
  }
};

// Utility Functions
const getEmptyInterview = (): Interview => ({
  id: NaN,
  isDeleted: false,
  name: "",
  result: InterviewResult.Waiting,
  resultDescription: "",
  fromTime: new Date(),
  toTime: new Date(),
  meetingRoomId: 0,
  onBoardDate: new Date(),
});

const findInterviewById = (id: number) =>
  interviews.value.find((c) => c.id == id);

const handleEventDragStart = (info: any) => {
  const interview = findInterviewById(info.event.id);
  if (interview) selectedInterview.value = interview;
};

const handleEventDropResize = (info: any) => {
  selectedInterview.value = {
    ...selectedInterview.value,
    fromTime: info.event.start,
    toTime: info.event.end,
    meetingRoomId: info.event.getResources()[0].id,
  };
  saveInterview();
};

const updateCalendarEvents = () => {
  calendarOptions.value.events = interviews.value.map((interview) => ({
    id: interview.id.toString(),
    title: interview.name,
    start: interview.fromTime,
    end: interview.toTime,
    resourceId: interview.meetingRoomId.toString(),
  }));
};

const updateCalendarResources = () => {
  calendarOptions.value.resources = meetingRooms.value.map((room) => ({
    id: room.id.toString(),
    title: room.name,
  }));
};

const addEventToCalendar = (newInterview: Interview) => {
  const calendarApi = calendarRef.value?.getApi();
  calendarApi?.addEvent({
    id: newInterview.id.toString(),
    title: newInterview.name,
    start: newInterview.fromTime,
    end: newInterview.toTime,
    resourceId: newInterview.meetingRoomId.toString(),
    extendedProps: { ...newInterview },
  });
};

const removeEventFromCalendar = (id: number) => {
  const calendarApi = calendarRef.value?.getApi();
  calendarApi?.getEventById(id.toString())?.remove();
};

const updateEventInCalendar = (updatedInterview: Interview) => {
  const calendarApi = calendarRef.value?.getApi();
  const event = calendarApi?.getEventById(updatedInterview.id.toString());
  if (event) {
    event.setProp("title", updatedInterview.name);
    event.setStart(updatedInterview.fromTime);
    event.setEnd(updatedInterview.toTime);
    event.setExtendedProp(
      "resourceId",
      updatedInterview.meetingRoomId.toString()
    );
    Object.entries(updatedInterview).forEach(([key, value]) => {
      event.setExtendedProp(key, value);
    });
  }
};

const resetSelectedInterview = () => {
  selectedInterview.value = getEmptyInterview();
};

const selectedInterview = ref<Interview>(getEmptyInterview());

const calendarOptions = ref<CalendarOptions>({
  plugins: [
    resourceTimeGridPlugin,
    interactionPlugin,
    dayGridPlugin,
    resourceList,
  ],
  initialView: "resourceTimeGridDay",
  locale: "vi",
  editable: true,
  droppable: true,
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,resourceTimeGridDay,list",
  },
  slotMinTime: "08:00:00",
  slotMaxTime: "19:00:00",
  timeZone: "Asia/Ho_Chi_Minh",
  buttonText: {
    prev: "<",
    next: ">",
    today: "Hôm Nay",
    resourceTimeGridDay: "Ngày",
    dayGridMonth: "Tháng",
    timeGridWeek: "Tuần",
    list: "Danh Sách",
  },
  buttonHints: {
    prev: "<",
    next: ">",
    today: "Hôm Nay",
    resourceTimeGridDay: "Ngày",
    dayGridMonth: "Tháng",
    timeGridWeek: "Tuần",
    list: "Danh Sách",
  },
  contentHeight: "auto",
  allDaySlot: false,
  expandRows: true,
  eventDragStart: handleEventDragStart,
  eventDrop: handleEventDropResize,
  eventResizeStart: handleEventDragStart,
  eventResize: handleEventDropResize,
  eventClick: openDialog,
  dateClick: createNewInterview,
});

onMounted(fetchData);

const interviewOptions = Object.values(InterviewResult).map((value, index) => ({
  index,
  value,
}));
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <FullCalendar ref="calendarRef" :options="calendarOptions" />
      </VCardText>
    </VCard>

    <VDialog
      v-model="isDialogOpen"
      max-width="600px"
      @click:outside="resetSelectedInterview"
    >
      <VCard>
        <VCardText style="font-weight: bold">Lịch Phỏng Vấn</VCardText>
        <VCardText style="display: flex; flex-direction: column; gap: 1rem">
          <VTextField
            v-model="selectedInterview.name"
            label="Tên cuộc phỏng vấn"
          />
          <VSelect
            v-model="selectedInterview.candidateId"
            :items="candidates"
            item-value="id"
            item-title="fullName"
            label="Chọn ứng viên"
          />
          <VSelect
            v-model="selectedInterview.result"
            :items="interviewOptions"
            item-value="index"
            item-title="value"
            label="Kết quả phỏng vấn"
          />
          <VTextField
            v-model="selectedInterview.resultDescription"
            label="Mô tả kết quả phỏng vấn"
          />
        </VCardText>

        <VCardActions>
          <VBtn variant="outlined" color="error" @click="deleteInterview">
            Xóa
          </VBtn>
          <VBtn variant="elevated" color="primary" @click="saveInterview">
            Lưu
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="css">
.fc-license-message {
  opacity: 0;
}
.fc .fc-toolbar-title {
  font-size: 1.5rem;
  text-transform: uppercase;
}
</style>
