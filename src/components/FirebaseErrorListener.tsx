
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // In development, this will be caught by the Next.js error overlay
      // if it's thrown as an unhandled exception. 
      // We throw it here to trigger that behavior.
      console.error('Firebase Permission Denied:', error.context);
      
      if (process.env.NODE_ENV === 'development') {
        throw new Error(
          `Firestore Permission Denied\nPath: ${error.context.path}\nOperation: ${error.context.operation}\nData: ${JSON.stringify(error.context.requestResourceData, null, 2)}`
        );
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, []);

  return null;
}
