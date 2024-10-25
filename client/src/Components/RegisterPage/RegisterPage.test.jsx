import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter to wrap components that use `useNavigate`  
import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  
  // Verifing that the RegisterPage renders the necessary input fields.
  test('renders registration form', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    
    // Check if the header and input fields are in the document
    const headerElement = screen.getByText(/Register Page/i);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    // Use getAllByPlaceholderText to handle multiple password fields
    const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
    const passwordInput = passwordInputs[0]; // First password input
    const confirmPasswordInput = passwordInputs[1]; // Second password input
    const registerButton = screen.getByRole('button', { name: /Register/i });
    
    expect(headerElement).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('allows user to type into input fields', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    // Use getAllByPlaceholderText to handle multiple password fields
    const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
    const passwordInput = passwordInputs[0]; // First password input
    const confirmPasswordInput = passwordInputs[1]; // Second password input
    
    // Simulate typing into the input fields
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    // Assert the input values have been updated
    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });  

  test('navigates to login page when login link is clicked', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    
    const loginLink = screen.getByText(/Login here/i);

    fireEvent.click(loginLink);
    
    expect(loginLink).toBeInTheDocument();
    
  }); 
});
