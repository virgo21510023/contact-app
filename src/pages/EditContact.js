import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Form, Input, Button, Switch, message } from 'antd';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const q = query(collection(db, 'contacts'), where('userId', '==', userId));

    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        message.error('No such document!');
        navigate('/home');
      }
      setLoading(false);
    };

    fetchContact();
  }, [id, navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        userId: auth.currentUser.uid,
      });
  
      message.success('Contact updated successfully');
      navigate('/home');
    } catch (error) {
      message.error('Failed to update contact');
    } finally {
      setLoading(false);
    }
  }; 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '50px' }}>
      <h1>Edit Contact</h1>
      <Form onFinish={onFinish} initialValues={contact}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Save
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={() => navigate(`/contact/${id}`)} block>
            Discard
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContact;