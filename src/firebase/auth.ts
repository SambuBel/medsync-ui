import { auth, googleProvider } from "./firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, signOut, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const loginWithPhone = async (phoneNumber: string) => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
  
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      return confirmationResult;
    } catch (error) {
      console.error("Error en Login con Teléfono:", error);
      throw error;
    }
};


// 🔹 Registrar usuario con Email/Contraseña y guardarlo en DB
export const registerWithFirebase = async (
  email: string,
  password: string,
  additionalData: Record<string, unknown>
) => {
    try {
      // 🔹 Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
    // 🔹 Enviar email de verificación
    await sendEmailVerification(firebaseUser);

      // 🔹 Enviar datos al backend para registrar en PostgreSQL
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUID: firebaseUser.uid,
          email,
          ...additionalData,
        }),
      });
  
      if (!res.ok) throw new Error("Error al registrar usuario en el backend");
  
      return firebaseUser;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
};

// 🔹 Iniciar sesión con Google y vincular a tu DB
export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
  
      console.log("✅ Usuario autenticado con Google:", firebaseUser);
  
      // 🔹 Enviar datos al backend
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUID: firebaseUser.uid,
          email: firebaseUser.email,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Error al iniciar sesión con Google");
      }
  
      return firebaseUser;
    } catch (error) {
      console.error("Error en Google Login:", error);
      throw error;
    }
};
  
  
// 🔹 Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("🔒 Usuario cerró sesión");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
      if (!firebaseUser.emailVerified) {
        throw new Error("Tu correo no está verificado. Revisa tu bandeja de entrada.");
      }
  
      return firebaseUser;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "📧 Correo de restablecimiento enviado. Revisa tu bandeja de entrada.";
  } catch (error) {
    console.error("Error al enviar correo de restablecimiento:", error);
    throw error;
  }
};