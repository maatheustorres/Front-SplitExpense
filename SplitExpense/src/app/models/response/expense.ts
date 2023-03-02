import { UserExpense } from "./user-expense";

export interface Expense {
  expenseId: string;
  userGroupId: string;
  userId: string;
  totalExpense: number;
  paid: boolean;
  userToReceive: string;
  groupName: string;
  userExpense: UserExpense[];
}
