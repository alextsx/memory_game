import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { togglePause } from '@/redux/game.slice';
import { SettingsModal } from './SettingsModal';

const mockShowAlert = jest.fn();
jest.mock('@/hocs/AlertProvider', () => ({
  useAlert: () => ({
    show: mockShowAlert
  })
}));

const mockStore = configureStore([]);
const initialState = {
  game: { isPaused: false },
  settings: {
    pairs: 8,
    timeLimit: 60,
    allowedMistakes: 3,
    username: 'TestUser'
  }
};

describe('SettingsModal component', () => {
  beforeEach(() => {
    mockShowAlert.mockClear();
  });

  it('opens the modal on trigger click and dispatches togglePause', async () => {
    const user = userEvent.setup();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <div id="modal-root" />
        <SettingsModal />
      </Provider>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /open settings/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(store.getActions()).toEqual([{ type: togglePause.type }]);
  });

  it('closes the modal when user clicks overlay', async () => {
    const user = userEvent.setup();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <div id="modal-root" />
        <SettingsModal />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /open settings/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('calls showAlert on save', async () => {
    const user = userEvent.setup();
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <div id="modal-root" />
        <SettingsModal />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /open settings/i }));

    const saveButton = await screen.findByRole('button', { name: /save settings/i });
    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledTimes(1);
    });

    expect(mockShowAlert).toHaveBeenCalledWith({
      message: 'To use your new settings, you need to restart the game.',
      title: 'Settings saved',
      variant: 'constructive'
    });
  });
});
