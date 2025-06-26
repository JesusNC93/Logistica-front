import { createContext, useContext, useState, useEffect } from "react";

// Crea el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user contiene { id, nombre, tipoDeUsuario }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar el usuario desde el localStorage cuando la aplicación se inicia
    const loadUser = () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        
        if (savedUser && token) {
          // Verificar que el token no esté expirado (opcional)
          setUser(savedUser);
        } else {
          // Si no hay usuario o token, asegúrate de que el estado esté limpio
          setUser(null);
        }
      } catch (error) {
        console.error("Error al cargar datos de usuario:", error);
        // En caso de error, limpiar los datos corruptos
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = (userData, token) => {
    // Asegurarse de que userData tiene la estructura esperada
    const userToStore = {
      id: userData.id,
      nombre: userData.apynom, // usamos apynom como nombre
      tipoDeUsuario: userData.rol, // backend devuelve "rol"
      userName: userData.userName
    };
    
    // Guardar el usuario y el token en localStorage
    localStorage.setItem("user", JSON.stringify(userToStore));
    localStorage.setItem("token", token);
    setUser(userToStore);
  };

  const logout = () => {
    // Limpiar localStorage y el estado del usuario
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
