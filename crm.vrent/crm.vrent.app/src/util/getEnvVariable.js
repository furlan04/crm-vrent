import { invoke } from '@tauri-apps/api/tauri';

async function getEnvVariable(variable) {
  try {
    const env_var = await invoke('get_env_var', { name: variable });
    return env_var;
  } catch (error) {
    console.error('Failed to fetch environment variable:', error);
  }
}

export default getEnvVariable;