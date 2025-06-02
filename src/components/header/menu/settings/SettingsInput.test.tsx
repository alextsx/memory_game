import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsInput } from './SettingsInput';

test('renders label and updates input', async () => {
  // userEvent v14+ uses an async API
  const user = userEvent.setup();

  render(<SettingsInput label="Pairs" id="pairs" type="number" />);

  const input = screen.getByLabelText(/Pairs/i);
  expect(input).toBeInTheDocument();

  // type and await
  await user.type(input, '4');
  // The input value is always a string in the DOM even if type="number"
  expect(input).toHaveValue(4);
});

test('displays error message', () => {
  render(<SettingsInput label="Pairs" id="pairs" error="Invalid value" />);

  expect(screen.getByText(/Invalid value/i)).toBeInTheDocument();
});

test('does not display error message', () => {
  render(<SettingsInput label="Pairs" id="pairs" />);
  expect(screen.queryByText(/Invalid value/i)).not.toBeInTheDocument();
});

test('input accepts additional props', async () => {
  const user = userEvent.setup();
  render(<SettingsInput label="Pairs" id="pairs" type="number" placeholder="Enter pairs" />);

  const input = screen.getByPlaceholderText(/Enter pairs/i);
  expect(input).toBeInTheDocument();

  await user.type(input, '5');
  expect(input).toHaveValue(5);
});

test('input has correct type', () => {
  render(<SettingsInput label="Pairs" id="pairs" type="number" />);

  const input = screen.getByLabelText(/Pairs/i);
  expect(input).toHaveAttribute('type', 'number');
});

test('input has error class when error is present', () => {
  render(<SettingsInput label="Pairs" id="pairs" error="Invalid value" />);
  const inputContainer = screen.getByText(/Invalid value/i).closest('.settings-option');
  expect(inputContainer).toHaveClass('settings-option error');
  expect(screen.getByText(/Invalid value/i)).toBeInTheDocument();
});

test('input does not have error class when no error', () => {
  render(<SettingsInput label="Pairs" id="pairs" />);
  const inputContainer = screen.getByLabelText(/Pairs/i).closest('.settings-option');
  expect(inputContainer).not.toHaveClass('error');
});
test('input has correct id', () => {
  render(<SettingsInput label="Pairs" id="pairs" type="number" />);

  const input = screen.getByLabelText(/Pairs/i);
  expect(input).toHaveAttribute('id', 'pairs');
});
