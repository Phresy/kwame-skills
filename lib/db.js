import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}

function readData(fileName) {
  const filePath = path.join(dataPath, `${fileName}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeData(fileName, data) {
  const filePath = path.join(dataPath, `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export const db = {
  users: {
    findAll: () => readData('users'),
    findById: (id) => readData('users').find(u => u.id === id),
    findByEmail: (email) => readData('users').find(u => u.email === email),
    create: (user) => {
      const users = readData('users');
      users.push(user);
      writeData('users', users);
      return user;
    },
    update: (id, updates) => {
      const users = readData('users');
      const index = users.findIndex(u => u.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        writeData('users', users);
        return users[index];
      }
      return null;
    },
    delete: (id) => {
      const users = readData('users');
      const filtered = users.filter(u => u.id !== id);
      writeData('users', filtered);
    }
  },
  
  skills: {
    findAll: () => readData('skills'),
    findById: (id) => readData('skills').find(s => s.id === id),
    findByUser: (userId) => readData('skills').filter(s => s.userId === userId),
    create: (skill) => {
      const skills = readData('skills');
      skills.push(skill);
      writeData('skills', skills);
      return skill;
    },
    update: (id, updates) => {
      const skills = readData('skills');
      const index = skills.findIndex(s => s.id === id);
      if (index !== -1) {
        skills[index] = { ...skills[index], ...updates };
        writeData('skills', skills);
        return skills[index];
      }
      return null;
    },
    delete: (id) => {
      const skills = readData('skills');
      const filtered = skills.filter(s => s.id !== id);
      writeData('skills', filtered);
    }
  },
  
  jobs: {
    findAll: () => readData('jobs'),
    findById: (id) => readData('jobs').find(j => j.id === id),
    findByPoster: (posterId) => readData('jobs').filter(j => j.posterId === posterId),
    create: (job) => {
      const jobs = readData('jobs');
      jobs.push(job);
      writeData('jobs', jobs);
      return job;
    },
    update: (id, updates) => {
      const jobs = readData('jobs');
      const index = jobs.findIndex(j => j.id === id);
      if (index !== -1) {
        jobs[index] = { ...jobs[index], ...updates };
        writeData('jobs', jobs);
        return jobs[index];
      }
      return null;
    },
    delete: (id) => {
      const jobs = readData('jobs');
      const filtered = jobs.filter(j => j.id !== id);
      writeData('jobs', filtered);
    }
  },
  
  applications: {
    findAll: () => readData('applications'),
    findById: (id) => readData('applications').find(a => a.id === id),
    findByJob: (jobId) => readData('applications').filter(a => a.jobId === jobId),
    findBySkiller: (skillerId) => readData('applications').filter(a => a.skillerId === skillerId),
    create: (application) => {
      const apps = readData('applications');
      apps.push(application);
      writeData('applications', apps);
      return application;
    },
    update: (id, updates) => {
      const apps = readData('applications');
      const index = apps.findIndex(a => a.id === id);
      if (index !== -1) {
        apps[index] = { ...apps[index], ...updates };
        writeData('applications', apps);
        return apps[index];
      }
      return null;
    },
    delete: (id) => {
      const apps = readData('applications');
      const filtered = apps.filter(a => a.id !== id);
      writeData('applications', filtered);
    }
  },

  // NEW: Messages methods
  messages: {
    findAll: () => readData('messages'),
    findById: (id) => readData('messages').find(m => m.id === id),
    findByConversation: (user1Id, user2Id) => {
      const messages = readData('messages');
      return messages.filter(m => 
        (m.fromId === user1Id && m.toId === user2Id) ||
        (m.fromId === user2Id && m.toId === user1Id)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    },
    findByUser: (userId) => {
      const messages = readData('messages');
      return messages.filter(m => m.fromId === userId || m.toId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    create: (message) => {
      const messages = readData('messages');
      messages.push(message);
      writeData('messages', messages);
      return message;
    },
    update: (id, updates) => {
      const messages = readData('messages');
      const index = messages.findIndex(m => m.id === id);
      if (index !== -1) {
        messages[index] = { ...messages[index], ...updates };
        writeData('messages', messages);
        return messages[index];
      }
      return null;
    },
    markAsRead: (messageId) => {
      const messages = readData('messages');
      const index = messages.findIndex(m => m.id === messageId);
      if (index !== -1) {
        messages[index].read = true;
        writeData('messages', messages);
        return messages[index];
      }
      return null;
    },
    delete: (id) => {
      const messages = readData('messages');
      const filtered = messages.filter(m => m.id !== id);
      writeData('messages', filtered);
    }
  }
};