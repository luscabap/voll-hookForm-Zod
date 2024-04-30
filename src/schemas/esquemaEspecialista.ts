import { z } from "zod";

export const esquemaCadastroEspecialistaEndereco = z.object({
    endereco: z.object({
      avatar: z.instanceof(FileList).transform(list => list.item(0)!),
      cep: z.string().min(8, 'Informe um CEP válido'),
      rua: z.string().min(1, 'O campo rua é obrigatório.'),
      numero: z.coerce.number().min(1, 'O campo número é obrigatório.'),
      bairro: z.string().min(1, 'O campo bairro é obrigatório.'),
      localidade: z.string().min(1, 'O campo localidade é obrigatório.'),
    })
  })