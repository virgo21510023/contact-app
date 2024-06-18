import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { List, Button, Input } from 'antd';
import { StarFilled } from '@ant-design/icons';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      return; // Keluar dari useEffect jika userId tidak tersedia
    }
    const q = query(collection(db, 'contacts'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contactsData = [];
      querySnapshot.forEach((doc) => {
        contactsData.push({ ...doc.data(), id: doc.id });
      });
      setContacts(contactsData);
    });
    return () => unsubscribe();
  }, []);

  // Mengurutkan kontak berdasarkan favorit dan nama
  const sortedContacts = contacts.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    } else if (!a.favorite && b.favorite) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const filteredContacts = sortedContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/getting-started');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleFavorite = async (id, currentFavoriteStatus) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, {
        favorite: !currentFavoriteStatus,
      });
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {auth.currentUser?.email}</h1>
      <Input.Search
        placeholder="Search Contacts"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button type="primary" onClick={() => navigate('/add-contact')} style={{ marginBottom: '20px' }}>
        Add Contact
      </Button>
      <Button type="primary" onClick={handleLogout} style={{ marginLeft:'20px', marginBottom: '20px' }}>
        Logout
      </Button>
      <div>
        <h2>Favorite Contacts</h2>
        <List
          bordered
          dataSource={filteredContacts.filter(contact => contact.favorite)}
          renderItem={item => (
            <List.Item
              actions={[
                <StarFilled
                  style={{ color: item.favorite ? 'gold' : 'grey' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id, item.favorite);
                  }}
                />,
              ]}
              onClick={() => navigate(`/contact/${item.id}`)}
            >
              {item.name}
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: '20px'}}>
        <h2>Contact List</h2>
        <List
          bordered
          dataSource={filteredContacts.filter(contact => !contact.favorite)}
          renderItem={item => (
            <List.Item
              actions={[
                <StarFilled
                  style={{ color: item.favorite ? 'gold' : 'grey' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id, item.favorite);
                  }}
                />,
              ]}
              onClick={() => navigate(`/contact/${item.id}`)}
            >
              {item.name}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Home;