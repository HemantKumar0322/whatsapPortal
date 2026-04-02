import React from 'react';
import { Typography, Card, Row, Col, Avatar, Tag, Button, Space } from 'antd';
import { IconUser, IconMail, IconPhone, IconLinkedin } from '@/utils/icons';

const { Title, Text } = Typography;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  skills: string[];
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      avatar: 'JD',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      department: 'Design',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      avatar: 'JS',
      skills: ['Figma', 'Adobe XD', 'Sketch'],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Product Manager',
      department: 'Product',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      avatar: 'MJ',
      skills: ['Agile', 'Scrum', 'Product Strategy'],
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      role: 'QA Engineer',
      department: 'Quality Assurance',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 456-7890',
      avatar: 'SW',
      skills: ['Selenium', 'Jest', 'Cypress'],
    },
    {
      id: '5',
      name: 'David Brown',
      role: 'DevOps Engineer',
      department: 'Operations',
      email: 'david.brown@company.com',
      phone: '+1 (555) 567-8901',
      avatar: 'DB',
      skills: ['Docker', 'Kubernetes', 'AWS'],
    },
    {
      id: '6',
      name: 'Emily Davis',
      role: 'Frontend Developer',
      department: 'Engineering',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 678-9012',
      avatar: 'ED',
      skills: ['Vue.js', 'CSS', 'JavaScript'],
    },
  ];

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'Engineering': 'blue',
      'Design': 'purple',
      'Product': 'green',
      'Quality Assurance': 'orange',
      'Operations': 'red',
    };
    return colors[department] || 'default';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Our Team</Title>
        <Button type="primary" icon={<IconUser />}>
          Add Team Member
        </Button>
      </div>
      
      <Row gutter={[16, 16]}>
        {teamMembers.map((member) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={member.id}>
            <Card
              hoverable
              className="h-full"
              actions={[
                <Button type="text" icon={<IconMail />} size="small" />,
                <Button type="text" icon={<IconPhone />} size="small" />,
                <Button type="text" icon={<IconLinkedin />} size="small" />,
              ]}
            >
              <div className="text-center mb-4">
                <Avatar 
                  size={64} 
                  className="bg-primary-500 mb-2"
                >
                  {member.avatar}
                </Avatar>
                <Title level={4} className="my-2">
                  {member.name}
                </Title>
                <Text type="secondary">{member.role}</Text>
              </div>
              
              <div className="mb-4">
                <Tag color={getDepartmentColor(member.department)}>
                  {member.department}
                </Tag>
              </div>
              
              <div className="mb-4">
                <Text type="secondary" className="text-xs">
                  <IconMail /> {member.email}
                </Text>
                <br />
                <Text type="secondary" className="text-xs">
                  <IconPhone /> {member.phone}
                </Text>
              </div>
              
              <div>
                <Text strong className="text-xs">Skills:</Text>
                <div className="mt-1">
                  {member.skills.map((skill, index) => (
                    <Tag key={index} className="mb-1">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Team; 