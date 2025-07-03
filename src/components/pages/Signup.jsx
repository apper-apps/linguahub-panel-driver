import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '@/App';
import { validateInviteToken } from '@/services/api/inviteService';
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isInitialized } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [inviteValid, setInviteValid] = useState(false);
  const [validating, setValidating] = useState(true);
  const [inviteError, setInviteError] = useState(null);
  
  useEffect(() => {
    const validateInvite = async () => {
      const token = searchParams.get('invite');
      if (!token) {
        setInviteError('Signup requires a valid invitation. Please contact an administrator.');
        setValidating(false);
        return;
      }
      
      try {
        const isValid = await validateInviteToken(token);
        if (isValid) {
          setInviteValid(true);
        } else {
          setInviteError('Invalid or expired invitation link. Please contact an administrator.');
        }
      } catch (error) {
        setInviteError('Unable to validate invitation. Please try again or contact an administrator.');
      } finally {
        setValidating(false);
      }
    };
    
    validateInvite();
  }, [searchParams]);
  
  useEffect(() => {
    if (isInitialized && inviteValid) {
      // Show signup UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showSignup("#authentication");
    }
  }, [isInitialized, inviteValid]);
  
  if (validating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-surface-800 rounded-lg shadow-md text-center">
          <div className="animate-pulse">
            <div className="w-14 h-14 mx-auto bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="text-sm text-gray-500">Validating invitation...</p>
        </div>
      </div>
    );
  }
  
  if (inviteError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-surface-800 rounded-lg shadow-md text-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-error to-error/80 text-white text-2xl 2xl:text-3xl font-bold">
              !
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="text-center text-lg xl:text-xl font-bold text-error">
                Invitation Required
              </div>
              <div className="text-center text-sm text-gray-500">
                {inviteError}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white text-2xl 2xl:text-3xl font-bold">
            L
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold">
              Create Account
            </div>
            <div className="text-center text-sm text-gray-500">
              Please create an account to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;