import { createContext, useState, useEffect, useContext } from 'react';

const MembershipContext = createContext();

export const useMemberships = () => useContext(MembershipContext);

export const MembershipProvider = ({ children }) => {
  const [memberships, setMemberships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load memberships from localStorage on initial render
  useEffect(() => {
    const loadMemberships = () => {
      try {
        const storedMemberships = localStorage.getItem('memberships');
        if (storedMemberships) {
          setMemberships(JSON.parse(storedMemberships));
        }
      } catch (error) {
        console.error('Error loading memberships from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberships();
  }, []);

  // Save memberships to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('memberships', JSON.stringify(memberships));
    }
  }, [memberships, isLoading]);

  // Add a new membership
  const addMembership = (membership) => {
    const newMembership = {
      ...membership,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMemberships([...memberships, newMembership]);
    return newMembership;
  };

  // Update an existing membership
  const updateMembership = (id, updatedMembership) => {
    const updatedMemberships = memberships.map((membership) =>
      membership.id === id
        ? { ...membership, ...updatedMembership, updatedAt: new Date().toISOString() }
        : membership
    );
    setMemberships(updatedMemberships);
  };

  // Delete a membership
  const deleteMembership = (id) => {
    const updatedMemberships = memberships.filter(
      (membership) => membership.id !== id
    );
    setMemberships(updatedMemberships);
  };

  // Get a single membership by ID
  const getMembership = (id) => {
    return memberships.find((membership) => membership.id === id);
  };

  const value = {
    memberships,
    isLoading,
    addMembership,
    updateMembership,
    deleteMembership,
    getMembership,
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
};
