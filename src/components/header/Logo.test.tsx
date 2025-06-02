import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { startGame } from '@/redux/game.slice';
import { Logo } from './Logo';

const mockShowAlert = jest.fn();
jest.mock('@/hocs/AlertProvider', () => ({
  useAlert: () => ({
    show: mockShowAlert
  })
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    onClick,
    className,
    ...props
  }: {
    src: string;
    alt: string;
    onClick?: () => void;
    className?: string;
  }) {
    return <img src={src} alt={alt} onClick={onClick} className={className} {...props} />;
  };
});

const mockStore = configureStore([]);

const mockSettings = {
  pairs: 8,
  timeLimit: 60,
  allowedMistakes: 3,
  username: 'TestUser'
};

describe('Logo component', () => {
  beforeEach(() => {
    mockShowAlert.mockClear();
  });

  it('renders the logo image with correct attributes', () => {
    const initialState = {
      game: { isGameStarted: false },
      settings: mockSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/assets/img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '215');
    expect(logoImage).toHaveAttribute('height', '119');
  });

  it('starts the game when clicked and game is not started', async () => {
    const user = userEvent.setup();
    const initialState = {
      game: { isGameStarted: false },
      settings: mockSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');
    await user.click(logoImage);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual({
      type: startGame.type,
      payload: mockSettings
    });

    expect(mockShowAlert).toHaveBeenCalledTimes(1);
    expect(mockShowAlert).toHaveBeenCalledWith({
      message: 'Good luck! 😃',
      title: 'Game Started',
      variant: 'constructive'
    });
  });

  it('does not start the game when clicked and game is already started', async () => {
    const user = userEvent.setup();
    const initialState = {
      game: { isGameStarted: true },
      settings: mockSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');
    await user.click(logoImage);

    // Check that no actions were dispatched
    const actions = store.getActions();
    expect(actions).toHaveLength(0);

    // Check that no alert was shown
    expect(mockShowAlert).not.toHaveBeenCalled();
  });

  it('applies disabled class when game is started', () => {
    const initialState = {
      game: { isGameStarted: true },
      settings: mockSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');
    expect(logoImage).toHaveClass('disabled');
  });

  it('does not apply disabled class when game is not started', () => {
    const initialState = {
      game: { isGameStarted: false },
      settings: mockSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');
    expect(logoImage).not.toHaveClass('disabled');
  });

  it('uses current settings when starting the game', async () => {
    const user = userEvent.setup();
    const customSettings = {
      pairs: 12,
      timeLimit: 120,
      allowedMistakes: 5,
      username: 'CustomUser'
    };
    const initialState = {
      game: { isGameStarted: false },
      settings: customSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');
    await user.click(logoImage);

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: startGame.type,
      payload: customSettings
    });
  });

  it('handles multiple clicks when game is not started', async () => {
    const user = userEvent.setup();
    const initialState = {
      game: { isGameStarted: false },
      settings: mockSettings
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    const logoImage = screen.getByAltText('Memo mission logo, starts the game');

    await user.click(logoImage);
    await user.click(logoImage);
    await user.click(logoImage);

    const actions = store.getActions();
    expect(actions).toHaveLength(3);

    expect(mockShowAlert).toHaveBeenCalledTimes(3);
  });
});
