export interface CreateExpenseRequest {
  totalExpense: number;
  paid: boolean;
  userGroupId: string;
  userId: string;
  groupId: string;
}
