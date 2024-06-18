import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Descriptions, Modal, message } from 'antd';

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        message.error('No such document!');
      }
      setLoading(false);
    };

    fetchContact();
  }, [id]);

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'contacts', id));
          message.success('Contact deleted successfully');
          navigate('/home');
        } catch (error) {
          message.error('Failed to delete contact');
        }
      },
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Descriptions title="Contact Details" bordered layout="vertical">
        <Descriptions.Item label="Name">{contact.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{contact.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{contact.phone}</Descriptions.Item>
        <Descriptions.Item label="Favorite">{contact.favorite ? 'Yes' : 'No'}</Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => navigate(`/edit-contact/${id}`)}>Edit</Button>
        <Button type="danger" onClick={showDeleteConfirm} style={{ marginLeft: '10px' }}>Delete</Button>
        <Button type="default" onClick={() => navigate('/home')} style={{ marginLeft: '10px' }}>Back</Button>
      </div>
    </div>
  );
};

export default ContactDetail;