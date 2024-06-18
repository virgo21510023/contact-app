import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Form, Input, Button, Switch } from 'antd';

const AddContact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Tambahkan state untuk menyimpan status favorit

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'contacts'), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        favorite: isFavorite || false, // Gunakan isFavorite untuk menyimpan status favorit
        userId: auth.currentUser.uid,
      });
      navigate('/home', { isFavorite }); // Kirim status favorit ke halaman Home
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '50px' }}>
      <h1>Add Contact</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item name="favorite" valuePropName="checked">
          <Switch onChange={(checked) => setIsFavorite(checked)} /> Favorite
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Save
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={() => navigate('/home')} block>
            Discard
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddContact;