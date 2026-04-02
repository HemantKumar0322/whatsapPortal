import React, { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { PlusOutlined, ImportOutlined, SearchOutlined } from '@ant-design/icons';
import { PageTitle } from '../components/PageTitle';
import { useNavigate } from 'react-router-dom';
import { SimpleCard, AvatarIconRound, IconBoxDynemic } from '@/components/uiPart';
import { IconDelete } from '@/utils/icons';
import ButtonSimple from '@/components/ButtonSimple';
import ImportContactsModal from '@/container/ImportContactsModal';
import InputCustom from '@/components/InputCustom';

interface ContactRecord {
  key: string;
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'Active' | 'Inactive';
  lastMessage?: string;
  createdDate: string;
}

const Contacts: React.FC = () => {

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const [contacts, setContacts] = useState<ContactRecord[]>([
    {
      key: '1',
      id: '1',
      name: 'Rakesh Tank',
      phone: '9163502262248',
      email: 'rakesh@example.com',
      status: 'Active',
      lastMessage: '10 Mar 2026, 2:09 pm',
      createdDate: '5 Mar 2026',
    },
    {
      key: '2',
      id: '2',
      name: 'Deepak Saini',
      phone: '917976589401',
      email: 'deepak@example.com',
      status: 'Active',
      lastMessage: '10 Mar 2026, 1:45 pm',
      createdDate: '3 Mar 2026',
    },
    {
      key: '3',
      id: '3',
      name: 'Div',
      phone: '917976776909',
      email: 'div@example.com',
      status: 'Active',
      lastMessage: '9 Mar 2026, 3:30 pm',
      createdDate: '1 Mar 2026',
    },
    {
      key: '4',
      id: '4',
      name: 'Kanhaiya Chaudhary',
      phone: '919204170891',
      email: 'kanhaiya@example.com',
      status: 'Active',
      createdDate: '28 Feb 2026',
    },
    {
      key: '5',
      id: '5',
      name: 'Aman Gupta',
      phone: '919588932166',
      email: 'aman@example.com',
      status: 'Inactive',
      createdDate: '25 Feb 2026',
    },
    {
      key: '6',
      id: '6',
      name: 'Anukul Dhuriya',
      phone: '917724080069',
      email: 'anukul@example.com',
      status: 'Active',
      createdDate: '20 Feb 2026',
    },
    {
      key: '7',
      id: '7',
      name: 'Aditya',
      phone: '916635057936',
      email: 'aditya@example.com',
      status: 'Active',
      createdDate: '18 Feb 2026',
    },
    {
      key: '8',
      id: '8',
      name: 'Dinesh Tank',
      phone: '919694996787',
      email: 'dinesh@example.com',
      status: 'Active',
      createdDate: '15 Feb 2026',
    },
    {
      key: '9',
      id: '9',
      name: 'Harsh',
      phone: '919667204045',
      email: 'harsh@example.com',
      status: 'Inactive',
      createdDate: '12 Feb 2026',
    },
  ]);

  function getInitials(name: string) {
    if (!name || !name.trim()) return "?";

    const words = name.trim().split(" ");

    const first = words[0]?.charAt(0) || "";
    const second = words[1]?.charAt(0) || "";

    return (first + second).toUpperCase() || "?";
  }



  return (
    <div className="">
      <SimpleCard className="mb-6">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4 ">
          <div>
            <PageTitle title="Contacts" />
            <p className="text-gray-500">Manage your contacts and start conversations.</p>
          </div>
          <div className="flex gap-3 items-center">
            <Button 
              icon={<ImportOutlined />}
              onClick={() => setImportModalOpen(true)}
            >
              Import
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedContact(null);
                form.resetFields();
                setModalOpen(true);
              }}
            >
              Add Contact
            </Button>
          </div>
        </div>
      </SimpleCard>

      {/* Search Bar */}
      <div className="mb-6">
        <InputCustom
          placeholder="Search contacts by name, phone, or email..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchText}
          onChange={(e:any) => setSearchText(e.target.value)}
          size="large"
          className="rounded-lg"
        />
      </div>

      {/* Contacts Table */}

      <div className='grid grid-cols-3 gap-4'>

        {contacts.map((contact) => (
          <div className='col-span-1'>
            <SimpleCard>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <AvatarIconRound
                    size="large"
                    // src="https://randomuser.me/api/portraits/men/32.jpg"
                    deffault={getInitials(contact.name)}
                  />
                  <div>
                    <p className='font-semibold'>{contact.name || contact.phone}</p>
                    <p className='text-gray-500 text-sm'>{contact.phone}</p>
                    {/* <p className='text-gray-500 text-sm'>{contact.email}</p> */}
                  </div>
                </div>
                <div>
                  <IconBoxDynemic
                    icon={<IconDelete />}
                    onClickEvent={() => console.log(contact)}
                    disabled={false}
                    // className="mb-2"
                    bgColor="bg-red-50"
                    iconColor="text-red-500"
                    hoverBgColor="hover:bg-red-100"
                    hoverIconColor="hover:text-red-700"
                  />

                  {/* <IconBoxDynemic
                    icon={<IconWechat />}
                    onClickEvent={() => console.log(contact)}
                    disabled={false}
                    bgColor="bg-blue-100"
                    iconColor="text-blue-500"
                    hoverBgColor="hover:bg-blue-200"
                    hoverIconColor="hover:text-blue-700"
                  /> */}
                </div>
              </div>
              <ButtonSimple className="mt-4 border-2" onClick={() => navigate('/chat/1')}>
                Start Conversation
              </ButtonSimple>
            </SimpleCard>
          </div>
        ))}
      </div>

      {/* Add/Edit Contact Modal */}
      <Modal
        title={selectedContact ? 'Edit Contact' : 'Add New Contact'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.validateFields().then((values) => {
                if (selectedContact) {
                  setContacts(
                    contacts.map((c) => (c.key === selectedContact.key ? { ...c, ...values } : c))
                  );
                } else {
                  setContacts([
                    ...contacts,
                    {
                      key: String(contacts.length + 1),
                      id: String(contacts.length + 1),
                      ...values,
                      status: 'Active',
                      createdDate: new Date().toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }),
                    },
                  ]);
                }
                setModalOpen(false);
              });
            }}
          >
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter contact name' }]}
          >
            <InputCustom placeholder="Enter contact name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: 'Please enter phone number' },
              {
                pattern: /^[0-9]{10,}$/,
                message: 'Please enter a valid phone number',
              },
            ]}
          >
            <InputCustom placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <InputCustom type="email" placeholder="Enter email address" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Import Contacts Modal */}
      <ImportContactsModal 
        open={importModalOpen}
        onCancel={() => setImportModalOpen(false)}
        onImport={(mappedContacts) => {
          setContacts([...contacts, ...mappedContacts]);
          setImportModalOpen(false);
        }}
      />
    </div>
  );
};

export default Contacts;
