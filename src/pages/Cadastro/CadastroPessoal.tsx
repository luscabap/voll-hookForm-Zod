import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ErrorMessage,
  Fieldset,
  Form,
  Input,
  InputMask,
  Label,
  Titulo,
} from "../../components";
import { z } from 'zod';

const esquemaCadastro = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter mais de 3 caracteres")
    .transform(value => value.toLocaleUpperCase()),
  email: z
    .string()
    .min(1, 'O campo E-mail é obrigatório.')
    .email("Por favor, digite um e-mail válido.")
    .transform(val => val.toLocaleLowerCase()),
  telefone: z
  .string()
  .min(1, 'O telefone é obrigatório.')
  .regex(/^\(\d{2,3}\) \d{5}-\d{4}$/, "Formato de telefone inválido"),
  senha: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
  senhaVerificada: z.string().min(1, 'Este campo não pode ser vazio.'),
}).refine(data => data.senha === data.senhaVerificada, {
  message: "As senhas não coincidem. Verifique novamente!",
  path: ["senhaVerificada"]
})

type FormInputTipos = z.infer<typeof esquemaCadastro>;

const CadastroPessoal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputTipos>({
    mode: "all",
    resolver: zodResolver(esquemaCadastro),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      senhaVerificada: "",
    },
  });

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados);
  };

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            $error={!!errors.nome}
            {...register("nome")}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            $error={!!errors.email}
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>
        <Controller
          control={control}
          name="telefone"
          rules={{
            pattern: {
              value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
              message: "O telefone inserido está no formato incorreto",
            },
            required: "O campo telefone é obrigatório",
          }}
          render={({ field }) => (
            <Fieldset>
              <Label>Telefone</Label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="Ex: (DD) XXXXX-XXXX"
                $error={!!errors.telefone}
                onChange={field.onChange}
              />
              {errors.telefone && (
                <ErrorMessage>{errors.telefone.message}</ErrorMessage>
              )}
            </Fieldset>
          )}
        />

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            $error={!!errors.senha}
            {...register("senha")}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            $error={!!errors.senhaVerificada}
            {...register("senhaVerificada")}
          />
          {errors.senhaVerificada && (
            <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
