<script setup lang="ts">
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/vue3";
import { ref } from "vue";

interface Event {
  id: string;
  title: string;
  start: Date | string;
  description?: string;
}

const events = ref<Event[]>([
  {
    id: "1",
    title: "Phỏng vấn 1",
    start: "2024-08-14T10:00:00",
    description: "Phỏng vấn với ứng viên A",
  },
  {
    id: "2",
    title: "Phỏng vấn 2",
    start: "2024-08-15T14:00:00",
    description: "Phỏng vấn với ứng viên B",
  },
]);

const isDialogVisible = ref(false);
const isNewEventDialogVisible = ref(false);
const isEditEventDialogVisible = ref(false);
const selectedEvent = ref<Partial<Event> | null>(null);
const newEvent = ref<Event>({
  id: "",
  title: "",
  start: "",
  description: "",
});
const newEventDate = ref<string | null>(null);

const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  locale: "vi",
  editable: true,
  droppable: true,
  events: events.value,
  slotMinTime: "08:00:00",
  slotMaxTime: "17:00:00",
  allDaySlot: false,
  expandRows: true,
  contentHeight: 800,
  eventClick: (info: any) => {
    showEventDetails(info.event);
  },
  eventDrop: (info: any) => {
    const event = events.value.find((e) => e.id === info.event.id);
    if (event) {
      event.start = info.event.start;
    }
  },
  eventReceive: (info: any) => {
    events.value.push({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
    });
  },
  dateClick: (info: any) => {
    showNewEventDialog(info.dateStr);
  },
};

const showEventDetails = (event: any) => {
  selectedEvent.value = {
    id: event.id,
    title: event.title,
    start: event.start.toISOString(),
    description: event.extendedProps.description,
  };
  isDialogVisible.value = true;
};

const showNewEventDialog = (date: string) => {
  newEventDate.value = date;
  newEvent.value = {
    id: Date.now().toString(), // Generate a new ID
    title: "",
    start: date,
    description: "",
  };
  isNewEventDialogVisible.value = true;
};

const saveNewEvent = () => {
  if (newEvent.value.title && newEvent.value.start) {
    events.value.push(newEvent.value);
    isNewEventDialogVisible.value = false;
  }
};

const editEvent = () => {
  if (selectedEvent.value && selectedEvent.value.id) {
    const event = events.value.find((e) => e.id === selectedEvent.value!.id);
    if (event) {
      event.title = selectedEvent.value.title || event.title;
      event.description = selectedEvent.value.description || event.description;
    }
    isDialogVisible.value = false;
    isEditEventDialogVisible.value = false;
  }
};
</script>

<template>
  <div>
    <VCard title="Lịch Phỏng Vấn">
      <VCardText>
        <FullCalendar :options="calendarOptions" />
      </VCardText>
    </VCard>

    <!-- Modal for Event Details -->
    <VDialog v-model="isDialogVisible" max-width="500">
      <VCard>
        <VCardText style="font-weight: bold">Chi Tiết Phỏng Vấn</VCardText>
        <VCardText>
          <div><strong>Tiêu đề:</strong> {{ selectedEvent?.title }}</div>
          <div><strong>Thời gian:</strong> {{ selectedEvent?.start }}</div>
          <div><strong>Mô tả:</strong> {{ selectedEvent?.description }}</div>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="isDialogVisible = false">Đóng</VBtn>
          <VBtn color="secondary" @click="isEditEventDialogVisible = true"
            >Sửa</VBtn
          >
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal for Editing Event -->
    <VDialog v-model="isEditEventDialogVisible" max-width="500">
      <VCard>
        <VCardText style="font-weight: bold">Chỉnh Sửa Phỏng Vấn</VCardText>
        <VCardText>
          <VTextField
            style="margin-bottom: 15px"
            v-model="selectedEvent!.title"
            label="Tiêu đề"
          />
          <VTextField
            style="margin-bottom: 15px"
            v-model="selectedEvent!.description"
            label="Mô tả"
          />
          <div><strong>Thời gian:</strong> {{ selectedEvent?.start }}</div>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="editEvent">Lưu</VBtn>
          <VBtn color="secondary" @click="isEditEventDialogVisible = false"
            >Hủy</VBtn
          >
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal for New Event -->
    <VDialog v-model="isNewEventDialogVisible" max-width="500">
      <VCard>
        <VCardText style="font-weight: bold">Thêm Phỏng Vấn Mới</VCardText>
        <VCardText>
          <VTextField
            style="margin-bottom: 15px"
            v-model="newEvent.title"
            label="Tiêu đề"
          />
          <VTextField
            style="margin-bottom: 15px"
            v-model="newEvent.description"
            label="Mô tả"
          />
          <div><strong>Thời gian:</strong> {{ newEvent.start }}</div>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="saveNewEvent">Lưu</VBtn>
          <VBtn color="secondary" @click="isNewEventDialogVisible = false"
            >Hủy</VBtn
          >
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
