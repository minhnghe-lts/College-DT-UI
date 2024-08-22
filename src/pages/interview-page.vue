<script setup lang="ts">
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceList from "@fullcalendar/list";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import FullCalendar from "@fullcalendar/vue3";
import { ref } from "vue";
import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VDialog,
  VSelect,
  VTextField,
} from "vuetify/components";

interface Interview {
  id?: string;
  isDeleted?: boolean;
  name?: string;
  candidateId?: number;
  result?: InterviewResult;
  resultDescription?: string;
  fromTime: Date;
  toTime: Date;
  meetingRoomId: number;
  onBoardDate?: Date;
}

interface Candidate {
  id: number;
  name: string;
}

enum InterviewResult {
  Waiting = "Waiting",
  Passed = "Passed",
  Failed = "Failed",
  Pending = "Pending",
}

const today = new Date();

const interviews = ref<Interview[]>([
  {
    id: "1",
    name: "Phỏng vấn 1",
    candidateId: 1,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      8
    ),
    result: InterviewResult.Waiting,
    resultDescription: "Ứng viên đang chờ kết quả",
    toTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9),
    meetingRoomId: 1,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "2",
    name: "Phỏng vấn 2",
    candidateId: 2,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9
    ),
    result: InterviewResult.Passed,
    resultDescription: "Ứng viên đã vượt qua phỏng vấn",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      10
    ),
    meetingRoomId: 2,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "3",
    name: "Phỏng vấn 3",
    candidateId: 3,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      10
    ),
    result: InterviewResult.Failed,
    resultDescription: "Ứng viên không đạt yêu cầu",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11
    ),
    meetingRoomId: 3,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "4",
    name: "Phỏng vấn 4",
    candidateId: 4,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      11
    ),
    result: InterviewResult.Pending,
    resultDescription: "Chờ quyết định từ phía nhà tuyển dụng",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12
    ),
    meetingRoomId: 4,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "5",
    name: "Phỏng vấn 5",
    candidateId: 5,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12
    ),
    result: InterviewResult.Waiting,
    resultDescription: "Ứng viên đang chờ kết quả",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      13
    ),
    meetingRoomId: 5,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "6",
    name: "Phỏng vấn 6",
    candidateId: 6,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      13
    ),
    result: InterviewResult.Passed,
    resultDescription: "Ứng viên đã vượt qua phỏng vấn",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      14
    ),
    meetingRoomId: 6,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "7",
    name: "Phỏng vấn 7",
    candidateId: 7,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      14
    ),
    result: InterviewResult.Waiting,
    resultDescription: "Ứng viên đang chờ kết quả",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      15
    ),
    meetingRoomId: 7,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "8",
    name: "Phỏng vấn 8",
    candidateId: 8,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      15
    ),
    result: InterviewResult.Pending,
    resultDescription: "Chờ quyết định từ phía nhà tuyển dụng",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      16
    ),
    meetingRoomId: 8,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "9",
    name: "Phỏng vấn 9",
    candidateId: 9,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      15
    ),
    result: InterviewResult.Pending,
    resultDescription: "Chờ quyết định từ phía nhà tuyển dụng",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      16
    ),
    meetingRoomId: 6,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "10",
    name: "Phỏng vấn 10",
    candidateId: 10,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      16
    ),
    result: InterviewResult.Pending,
    resultDescription: "Chờ quyết định từ phía nhà tuyển dụng",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      17
    ),
    meetingRoomId: 5,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "11",
    name: "Phỏng vấn 11",
    candidateId: 11,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      17
    ),
    result: InterviewResult.Pending,
    resultDescription: "Chờ quyết định từ phía nhà tuyển dụng",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18
    ),
    meetingRoomId: 4,
    onBoardDate: today,
    isDeleted: false,
  },
  {
    id: "11",
    name: "Phỏng vấn 11",
    candidateId: 11,
    fromTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18
    ),
    result: InterviewResult.Pending,
    resultDescription: "Chờ quyết định từ phía nhà tuyển dụng",
    toTime: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      19
    ),
    meetingRoomId: 3,
    onBoardDate: today,
    isDeleted: false,
  },
]);

const candidates = ref<Candidate[]>([
  { id: 1, name: "Ứng viên A" },
  { id: 2, name: "Ứng viên B" },
  { id: 3, name: "Ứng viên C" },
]);

const calendarOptions = ref({
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
  events: interviews.value.map((interview) => ({
    id: interview.id,
    title: interview.name,
    start: interview.fromTime,
    end: interview.toTime,
    resourceId: interview.meetingRoomId,
    extendedProps: {
      candidateId: interview.candidateId,
      result: interview.result,
      resultDescription: interview.resultDescription,
      onBoardDate: interview.onBoardDate,
      isDeleted: interview.isDeleted,
    },
  })),
  resources: [
    { id: "1", title: "Phòng 1" },
    { id: "2", title: "Phòng 2" },
    { id: "3", title: "Phòng 3" },
    { id: "4", title: "Phòng 4" },
    { id: "5", title: "Phòng 5" },
    { id: "6", title: "Phòng 6" },
    { id: "7", title: "Phòng 7" },
  ],
  slotMinTime: "08:00:00",
  slotMaxTime: "19:00:00",
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
    prev: "Hôm Trước",
    next: "Hôm Sau",
    today: "Hôm Nay",
    resourceTimeGridDay: "Ngày",
    dayGridMonth: "Tháng",
    timeGridWeek: "Tuần",
    list: "Danh Sách",
  },
  contentHeight: "auto",
  allDaySlot: false,
  expandRows: true,
  eventClick: (info: any) => {
    selectedInterview.value = {
      ...info.event.extendedProps,
      name: info.event.title,
      id: info.event.id,
      fromTime: info.event.start,
      toTime: info.event.end,
      meetingRoomId: parseInt(info.event.getResources()[0]?.id ?? "0"),
    };
    isDialogOpen.value = true;
  },
  dateClick: (info: any) => {
    const startTime = info.date;
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    selectedInterview.value = {
      id: "",
      isDeleted: false,
      name: "",
      result: InterviewResult.Waiting,
      resultDescription: "",
      fromTime: startTime,
      toTime: endTime,
      meetingRoomId: parseInt(info.resource.id),
      onBoardDate: new Date(),
    };
    isDialogOpen.value = true;
  },
});

const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);
const isDialogOpen = ref(false);

const selectedInterview = ref<Interview>({
  id: "",
  isDeleted: false,
  name: "",
  result: InterviewResult.Waiting,
  resultDescription: "",
  fromTime: new Date(),
  toTime: new Date(),
  meetingRoomId: 0,
  onBoardDate: new Date(),
});

const saveInterview = () => {
  const calendarApi = calendarRef.value?.getApi();

  if (calendarApi) {
    if (selectedInterview.value?.id) {
      const event = calendarApi.getEventById(selectedInterview.value.id);
      if (event) {
        event.setProp("title", selectedInterview.value.name);
        event.setStart(selectedInterview.value.fromTime);
        event.setEnd(selectedInterview.value.toTime);
        event.setExtendedProp(
          "candidateId",
          selectedInterview.value.candidateId
        );
        event.setExtendedProp("result", selectedInterview.value.result);
        event.setExtendedProp(
          "resultDescription",
          selectedInterview.value.resultDescription
        );
        event.setExtendedProp(
          "onBoardDate",
          selectedInterview.value.onBoardDate
        );
      }
    } else {
      calendarApi.addEvent({
        id: new Date().getTime().toString(),
        title: selectedInterview.value?.name,
        start: selectedInterview.value?.fromTime,
        end: selectedInterview.value?.toTime,
        resourceId: selectedInterview.value?.meetingRoomId.toString(),
        extendedProps: {
          candidateId: selectedInterview.value?.candidateId,
          result: selectedInterview.value?.result,
          resultDescription: selectedInterview.value?.resultDescription,
          onBoardDate: selectedInterview.value?.onBoardDate,
        },
      });
    }
  }

  isDialogOpen.value = false;
  resetSelectedInterview();
};

const deleteInterview = () => {
  const calendarApi = calendarRef.value?.getApi();

  if (selectedInterview.value?.id && calendarApi) {
    const event = calendarApi.getEventById(selectedInterview.value.id);
    if (event) event.remove();
  }
  isDialogOpen.value = false;
  resetSelectedInterview();
};

const resetSelectedInterview = () => {
  selectedInterview.value = {
    id: "",
    isDeleted: false,
    name: "",
    result: InterviewResult.Waiting,
    resultDescription: "",
    fromTime: new Date(),
    toTime: new Date(),
    meetingRoomId: 0,
    onBoardDate: new Date(),
  };
};
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <FullCalendar ref="calendarRef" :options="calendarOptions" />
      </VCardText>
    </VCard>

    <VDialog v-model="isDialogOpen" max-width="600px">
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
            item-title="name"
            label="Chọn ứng viên"
          />
          <VSelect
            v-model="selectedInterview.result"
            :items="Object.values(InterviewResult)"
            label="Kết quả phỏng vấn"
          />
          <VTextField
            v-model="selectedInterview.resultDescription"
            label="Mô tả kết quả"
          />
        </VCardText>
        <VCardActions>
          <VBtn
            size="small"
            variant="elevated"
            color="primary"
            @click="saveInterview"
          >
            Lưu
          </VBtn>
          <VBtn
            size="small"
            variant="elevated"
            color="error"
            @click="deleteInterview"
          >
            Xóa
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
