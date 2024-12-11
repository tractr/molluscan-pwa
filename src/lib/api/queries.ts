import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodos, TodoInsert, TodoUpdate, updateTodo } from './todos';
import { useToast } from '@/hooks/use-toast';
import { getValvosGeography, getValvo, getGeneralIndicator } from './valvo';
import { getCities } from './cities';
import { IndicatorGeneralDetails } from '@/types/valvo';

export function useTodos({ done }: { done?: boolean } = {}) {
  return useQuery({
    queryKey: ['todos', { done }],
    queryFn: () => getTodos({ done }),
  });
}

export function useValvosGeography({ done }: { done?: boolean } = {}) {
  return useQuery({
    queryKey: ['valvosGeography', { done }],
    queryFn: () => getValvosGeography({ done }),
  });
}

export function useValvoWithIndicator(valvoId: string | null) {
  return useQuery<IndicatorGeneralDetails | null>({
    queryKey: ['valvoWithIndicator', valvoId],
    queryFn: async () => {
      if (!valvoId) return null;
      const [valvoDetails, generalIndicator] = await Promise.all([
        getValvo({ valvo_id: valvoId }),
        getGeneralIndicator({
          params: {
            valvo_id: valvoId,
            period_of_time: 1,
            start_date: new Date(),
          },
        }),
      ]);

      if (!valvoDetails || !generalIndicator) return null;

      return {
        ...generalIndicator,
        location: {
          name: valvoDetails.name,
          city: valvoDetails.city,
        },
      };
    },
    enabled: !!valvoId,
  });
}

export function useCities({ done }: { done?: boolean } = {}) {
  return useQuery({
    queryKey: ['cities', { done }],
    queryFn: () => getCities({ done }),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (todo: TodoInsert) => createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Success',
        description: 'Todo created successfully',
      });
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: TodoUpdate }) => updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Success',
        description: 'Todo updated successfully',
      });
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
      });
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    },
  });
}

export function useValvoGeography(valvoId: string | null) {
  return useQuery({
    queryKey: ['valvoGeography', valvoId],
    queryFn: async () => {
      if (!valvoId) return null;
      const valvos = await getValvosGeography();
      return valvos.find(valvo => valvo.id === valvoId) || null;
    },
    enabled: !!valvoId,
  });
}
