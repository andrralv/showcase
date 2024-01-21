import { createSlice } from '@reduxjs/toolkit';

type State = {
    modal: {
      successModal: {
        isOpen: boolean;
        additionalData?: unknown;
      },
      failureModal: {
        isOpen: boolean;
      }
    }
};

const initialState = {
    successModal: {
      isOpen: false,
      additionalData: null,
    },
    failureModal: {
      isOpen: false,
    }
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSuccessModal: (state, action) => {
      state.failureModal.isOpen = false;
      state.successModal.isOpen = true;
      state.successModal.additionalData = action.payload?.additionalData;
    },
    openFailureModal: (state) => {
      state.failureModal.isOpen = true;
      state.successModal.isOpen = false;
    },
    closeModal: (state) => {
      state.successModal.isOpen = false;
      state.successModal.additionalData = null;
      state.failureModal.isOpen = false;
    },
  },
});

export const { openSuccessModal, openFailureModal, closeModal } = modalSlice.actions;

export const successModalOpen = (state: State) => state.modal.successModal.isOpen
export const successModalData = (state: State) => state.modal.successModal.additionalData;
export const failureModalOpen = (state: State) => state.modal.failureModal.isOpen;

export default modalSlice.reducer;
