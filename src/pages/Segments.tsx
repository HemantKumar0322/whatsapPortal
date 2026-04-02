import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageTitle } from '../components/PageTitle';
import { IconBox, SimpleCard } from '@/components/uiPart';

import ImportContactsModal from '@/container/ImportContactsModal';
import InputCustom from '@/components/InputCustom';
import ButtonSimple from '@/components/ButtonSimple';
import { LabelInput } from '@/components/LabelInput';
import SelectCustom from '@/components/SelectCustom';
import { IconUser } from '@/utils/icons';

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

const Segments: React.FC = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null);

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

  return (
    <div className="">
      <SimpleCard className="mb-6">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4 ">
          <div>
            <PageTitle title="Smart Segments" />
            <p className="text-gray-500">Create dynamic lists for targeted retargeting.</p>
          </div>
          <div className="flex gap-3 items-center">
            <ButtonSimple
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedContact(null);
                form.resetFields();
                setModalOpen(true);
              }}
            >
              Create Segment
            </ButtonSimple>
          </div>
        </div>
      </SimpleCard>

      {/* Segments */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='col-span-1'>
          <SimpleCard>

            <div className='flex items-center justify-between'>
              <div className='font-semibold fs-14'>{"12"}</div>
              <div>
                <IconBox
                  icon={<IconUser />}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-500"
                />
              </div>
            </div>

            <p className='text-gray-500 text-sm mb-2'>Created 30 Mar 2026, 10:10 pm</p>

            <p className='font-semibold text-[12px] border-b border-gray-300 pb-3'>
              <span className='border border-gray-500 rounded-full px-2'>12 days old</span>
            </p>

            <div className='flex items-center justify-between mt-2'>
              <p className='text-gray-500 text-sm'>Est. Audience</p>
              <div className='font-semibold text-[12px]'>12</div>
            </div>
            
          </SimpleCard>
        </div>
      </div>


      {/* Add/Edit Contact Modal */}
      <Modal
        title="Create New Segment"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <div key="footer" className="flex justify-end gap-2">
            <ButtonSimple key="back" onClick={() => setModalOpen(false)}>
              Cancel
            </ButtonSimple>
            <ButtonSimple
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
            </ButtonSimple>
          </div>
        ]}
      >
        <div>
          <LabelInput required>Segment Name</LabelInput>
          <InputCustom
            placeholder="Enter segment name"
            className="mb-4"
            name="segmentName"
          />
        </div>

        <div>
          <LabelInput required>Must have tags</LabelInput>
          <SelectCustom
            placeholder="Select tags"
            className="mb-4"
            name="tags"
          />
        </div>

        <div>
          <LabelInput required>Leads older than (days)</LabelInput>
          <InputCustom
            placeholder="Enter number of days"
            className="mb-4"
            name="days"
            type="number"
          />
        </div>

      </Modal>

      {/* Import Segments Modal */}
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

export default Segments;
