import { Controller, Get, Put , Param} from '@nestjs/common';
import { supabase } from '../supabase';

@Controller('tasks')
export class TasksController {
  //Retrieve all task
  @Get()
  async getallTask(){
    const response = await supabase.from('tasks').select('*')
    const data = response.data;
    const error = response.error;
    if (error){
      throw new Error(response.error.message);
    }
    return data;
  }
  // Retrieve all done task
  @Get('done')
  async getdoneTasks() {
    const response = await supabase.from('tasks').select('*').eq('is_done', true);
    const data = response.data;
    const error = response.error;
    if (error){
      throw new Error(response.error.message);
    }
    return data;
  }
  // Retrieve all undone task
  @Get('undone')
  async getundoneTasks() {
    const response = await supabase.from('tasks').select('*').eq('is_done', false);
    const data = response.data;
    const error = response.error;
    if (error){
      throw new Error(response.error.message);
    }
    return data;
  }
  
  
  //Update Task Status by Task Id
  //Create Task
  //Delete Task
}
