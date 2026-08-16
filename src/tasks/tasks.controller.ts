import { Controller, Get, Put , Post ,Body ,Delete , Param} from '@nestjs/common';
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
  @Put(':id')
async updateTaskStatus(
  @Param('id') id: string,
) {
  // Get current task
  const { data: task, error: getError } = await supabase
    .from('tasks')
    .select('is_done')
    .eq('task_id', id)
    .single();

  if (getError) {
    throw new Error(getError.message);
  }

  // Toggle status
  const { data, error } = await supabase
    .from('tasks')
    .update({ is_done: !task.is_done })
    .eq('task_id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
  //Create Task
@Post()
async createTask(
  @Body() body: { task_name: string },
) {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      task_name: body.task_name,
      is_done: false,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

  
// Delete Task by task id
@Delete(':id')
async deleteTask(
  @Param('id') id: string,
) {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('task_id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
}
