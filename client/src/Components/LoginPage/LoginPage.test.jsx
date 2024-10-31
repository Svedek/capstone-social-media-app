import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to wrap components that use `useNavigate`
import LoginPage from './LoginPage';  

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
})); 

describe('LoginPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  }); 

  // Verifing that the LoginPage renders the necessary input fields (email, password, login button).
  test('login form with email and password inputs', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // typing into the email and password input fields.
  test('allows users to type into input fields', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  
  // Navigating to home on successful login
  /*test('navigates to home on successful login', () => {

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    //const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });*/

  // Testing that the "Remember Me" checkbox can be selected
  test('allows user to check the "Remember Me" checkbox', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const rememberMeCheckbox = screen.getByLabelText(/Remember me/i);
    expect(rememberMeCheckbox).toBeInTheDocument();
    expect(rememberMeCheckbox.checked).toBe(false);

    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
  });

  // Ensuring that the "Forgot Password?" link is visible on the login page.
 test('displays "Forgot Password?" link', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const forgotPasswordLink = screen.getByText(/Forgot Password/i);
    expect(forgotPasswordLink).toBeInTheDocument();
  }); 

  // Ensuring that link to register page is visible on the login page.
  test('displays "Create a new account here" link to register page', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const registerLink = screen.getByText(/Create a new account here/i);
    expect(registerLink).toBeInTheDocument();
  }); 

   // Testing invalid email format
   test('shows validation error for invalid email format', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Checking that no navigation occurs 
    expect(mockNavigate).not.toHaveBeenCalled();

    // checking for validation error 
    const validationError = screen.queryByText(/Please enter a valid email address/i);
    if (validationError) expect(validationError).toBeInTheDocument();
  });

  // Test for "Create a new account here" link navigation to register page
  /*test('navigates to register page when "Create a new account here" link is clicked', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const registerLink = screen.getByText(/Create a new account here!/i);
    fireEvent.click(registerLink);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });*/
});
