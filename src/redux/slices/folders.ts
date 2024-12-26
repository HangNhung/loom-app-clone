import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  folders: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId?: string | null;
  })[];
};

const initialState: initialStateProps = {
  folders: [],
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<initialStateProps>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { FOLDERS } = foldersSlice.actions;
export default foldersSlice.reducer;
