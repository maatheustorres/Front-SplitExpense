export interface UpdateExpenseRequest {
  expense: number;
  paid: boolean;
  userId: string;
  userGroupId: string;
}
