type initialStateProps = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const initialState: initialStateProps = {
  workspaces: [],
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<initialStateProps>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { WORKSPACES } = workspacesSlice.actions;
export default workspacesSlice.reducer;
