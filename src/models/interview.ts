export interface BaseEntity {
  id: number;
}

export interface BaseEntitySoftDeletable extends BaseEntity {
  isDeleted: boolean;
}

export interface BaseMasterData extends BaseEntitySoftDeletable {
  name: string;
}

export interface Interview extends BaseMasterData {
  candidateId?: number;
  result?: InterviewResult;
  resultDescription?: string;
  fromTime: Date;
  toTime: Date;
  meetingRoomId: number;
  onBoardDate?: Date;
  candidate?: Candidate;
  meetingRoom?: MeetingRoom;
}

export interface Candidate {
  id?: number;
  name?: string;
}

export interface MeetingRoom extends BaseMasterData {}

export enum InterviewResult {
  Waiting = "Đang Chờ",
  Passed = "Đã Qua",
  Failed = "Đã Trượt",
  Pending = "Chưa Giải Quyết",
}
