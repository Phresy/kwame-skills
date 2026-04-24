import { supabase } from './supabase';

export const db = {
  users: {
    findAll: async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return data;
    },
    findById: async (id) => {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
      if (error) return null;
      return data;
    },
    findByEmail: async (email) => {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
      if (error) return null;
      return data;
    },
    create: async (user) => {
      const { data, error } = await supabase.from('users').insert(user).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id, updates) => {
      const { data, error } = await supabase.from('users').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id) => {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw error;
    }
  },
  jobs: {
    findAll: async () => {
      const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    findById: async (id) => {
      const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
      if (error) return null;
      return data;
    },
    create: async (job) => {
      const { data, error } = await supabase.from('jobs').insert(job).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id, updates) => {
      const { data, error } = await supabase.from('jobs').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id) => {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (error) throw error;
    }
  },
  skills: {
    findAll: async () => {
      const { data, error } = await supabase.from('skills').select('*');
      if (error) throw error;
      return data;
    },
    findById: async (id) => {
      const { data, error } = await supabase.from('skills').select('*').eq('id', id).single();
      if (error) return null;
      return data;
    },
    create: async (skill) => {
      const { data, error } = await supabase.from('skills').insert(skill).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id, updates) => {
      const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id) => {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
    }
  },
  applications: {
    findAll: async () => {
      const { data, error } = await supabase.from('applications').select('*');
      if (error) throw error;
      return data;
    },
    create: async (application) => {
      const { data, error } = await supabase.from('applications').insert(application).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id, updates) => {
      const { data, error } = await supabase.from('applications').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    }
  },
  messages: {
    findAll: async () => {
      const { data, error } = await supabase.from('messages').select('*');
      if (error) throw error;
      return data;
    },
    create: async (message) => {
      const { data, error } = await supabase.from('messages').insert(message).select().single();
      if (error) throw error;
      return data;
    },
    findByConversation: async (user1Id, user2Id) => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`from_id.eq.${user1Id},to_id.eq.${user1Id}`)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    findByUser: async (userId) => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`from_id.eq.${userId},to_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    markAsRead: async (messageId) => {
      const { data, error } = await supabase.from('messages').update({ read: true }).eq('id', messageId).select().single();
      if (error) throw error;
      return data;
    }
  }
};