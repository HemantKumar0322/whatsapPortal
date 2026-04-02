import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  Tag,
  Tooltip,
  Empty,
  Popconfirm,
  message,
} from 'antd';
import {
  EditOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { PageTitleWithDescription } from '@/components/uiPart';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  imageUrl?: string;
  excerpt?: string;
  content?: string;
}

const BlogManager: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Ultimate Guide to WhatsApp Marketing in 2025',
      slug: 'ultimate-guide-whatsapp-marketing-2025',
      status: 'published',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c',
      excerpt: 'Discover strategies for WhatsApp marketing success',
      content: '# The Future of WhatsApp Marketing\n\nWhatsApp marketing is evolving...',
    },
    {
      id: '2',
      title: 'How to Automate Customer Support without Losing the Human Touch',
      slug: 'automate-customer-support-human-touch',
      status: 'published',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      excerpt: 'Learn best practices for customer support automation',
      content: 'Content here...',
    },
    {
      id: '3',
      title: 'Is WhatsApp API Right for Small Businesses?',
      slug: 'whatsapp-api-for-small-business',
      status: 'published',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      excerpt: 'Explore WhatsApp API for small businesses',
      content: 'Content here...',
    },
    {
      id: '4',
      title: 'Boosting E-commerce Sales with Abandoned Cart Recovery',
      slug: 'boost-ecommerce-sales-abandoned-cart',
      status: 'published',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c',
      excerpt: 'Recover lost sales with smart cart reminders',
      content: 'Content here...',
    },
    {
      id: '5',
      title: 'Case Study: How Urban Styles Increased Revenue by 40%',
      slug: 'case-study-urban-styles',
      status: 'published',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
      excerpt: 'Real-world case study of revenue growth',
      content: 'Content here...',
    },
    {
      id: '6',
      title: 'New Feature: WhatsApp Flows for Lead Qualification',
      slug: 'new-feature-whatsapp-flows',
      status: 'published',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18',
      excerpt: 'Introduce WhatsApp flows for better lead qualification',
      content: 'Content here...',
    },
  ]);

  const handleNewPost = () => {
    setIsEditMode(false);
    setSelectedPost(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditPost = (record: BlogPost) => {
    setIsEditMode(true);
    setSelectedPost(record);
    form.setFieldsValue({
      title: record.title,
      slug: record.slug,
      imageUrl: record.imageUrl,
      excerpt: record.excerpt,
      content: record.content,
      published: record.status === 'published',
    });
    setIsModalOpen(true);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
    message.success('Post deleted successfully');
  };

  const handleSubmit = (values: any) => {
    if (isEditMode && selectedPost) {
      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id
            ? {
                ...post,
                title: values.title,
                slug: values.slug,
                imageUrl: values.imageUrl,
                excerpt: values.excerpt,
                content: values.content,
                status: values.published ? 'published' : 'draft',
              }
            : post
        )
      );
      message.success('Post updated successfully');
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: values.title,
        slug: values.slug,
        imageUrl: values.imageUrl,
        excerpt: values.excerpt,
        content: values.content,
        status: values.published ? 'published' : 'draft',
      };
      setPosts([newPost, ...posts]);
      message.success('Post created successfully');
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '35%',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: '35%',
      render: (text: string) => (
        <span className="text-gray-500 text-sm">{text}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (_: any, record: BlogPost) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined className="text-gray-500" />}
              onClick={() => handleEditPost(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="View">
            <Button
              type="text"
              icon={<InfoCircleOutlined className="text-blue-500" />}
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Delete Post"
            description="Are you sure you want to delete this post?"
            onConfirm={() => handleDeletePost(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              type="text"
              icon={<DeleteOutlined className="text-red-500" />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <PageTitleWithDescription
            title="Blog Manager"
            description="Manage your content and posts"
          />
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleNewPost}
            className="bg-green-500 hover:bg-green-600"
          >
            New Post
          </Button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          dataSource={posts}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} posts`,
          }}
          rowKey="id"
          locale={{
            emptyText: <Empty description="No posts found" />,
          }}
          className="p-4"
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        title={isEditMode ? 'Edit Post' : 'Create New Post'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={650}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter post title' }]}
          >
            <Input
              placeholder="Enter post title"
              size="large"
              className="border-green-300 focus:border-green-500"
            />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Please enter post slug' }]}
          >
            <Input placeholder="post-url-slug" />
          </Form.Item>

          <Form.Item label="Image URL" name="imageUrl">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item label="Excerpt (Short description)" name="excerpt">
            <Input.TextArea
              placeholder="Brief summary for the card..."
              rows={3}
            />
          </Form.Item>

          <Form.Item
            label="Content (Markdown supported)"
            name="content"
            rules={[{ required: true, message: 'Please enter post content' }]}
          >
            <Input.TextArea
              placeholder="# Hello World..."
              rows={8}
            />
          </Form.Item>

          <Form.Item label="Published Status" name="published" valuePropName="checked">
            <div>
              <Switch defaultChecked />
              <span className="ml-2 text-gray-500 text-sm">
                Visible to public if enabled
              </span>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-green-500 hover:bg-green-600 font-semibold mt-4"
            >
              {isEditMode ? 'Update Post' : 'Create Post'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManager;
