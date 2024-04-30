import { z } from "zod";
import {
  Button,
  Divisor,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
  UploadDescription,
  UploadIcon,
  UploadInput,
  UploadLabel,
  UploadTitulo,
} from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const esquemaCadastroEspecialistaEndereco = z.object({
  endereco: z.object({
    cep: z.string().min(9, 'Informe um CEP válido'),
    rua: z.string().min(1, 'O campo rua é obrigatório.'),
    numero: z.coerce.number().min(1, 'O campo número é obrigatório.'),
    bairro: z.string().min(1, 'O campo bairro é obrigatório.'),
    localidade: z.string().min(1, 'O campo localidade é obrigatório.'),
  })
})

type FormCadastroEspecilistaEndereco = z.infer<typeof esquemaCadastroEspecialistaEndereco>

const CadastroEspecialistaEndereco = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormCadastroEspecilistaEndereco>({
    resolver: zodResolver(esquemaCadastroEspecialistaEndereco),
    defaultValues: {
      endereco: {
        cep: "",
        rua: "",
        numero: 0,
        bairro: "",
        localidade: ""
      }
    }
  })

  console.log(errors)

  const aoSubmeter = (data: FormCadastroEspecilistaEndereco) => {
    console.log(data)
  }

  return (
    <>
      <Titulo className="titulo">Para finalizar, só alguns detalhes!</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <>
          <UploadTitulo>Sua foto</UploadTitulo>
          <UploadLabel htmlFor="campo-upload">
            <UploadIcon />
            <UploadDescription>Clique para enviar</UploadDescription>
            <UploadInput accept="image/*" id="campo-upload" type="file" />
          </UploadLabel>
        </>

        <Divisor />
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input 
            id="campo-cep" 
            placeholder="Insira seu CEP" 
            type="text" 
            {...register('endereco.cep')}
            $error={!!errors.endereco?.cep}
          />
          {errors.endereco?.cep && (
              <ErrorMessage>{errors.endereco?.cep.message}</ErrorMessage>
            )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input 
            id="campo-rua" 
            placeholder="Rua Agarikov" 
            type="text" 
            $error={!!errors.endereco?.rua}
            {...register('endereco.rua')}
          />
          {errors.endereco?.rua && (
            <ErrorMessage>{errors.endereco.rua.message}</ErrorMessage>
          )}
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input 
              id="campo-numero-rua" 
              placeholder="Ex: 1440" 
              type="text" 
              $error={!!errors.endereco?.numero}
              {...register('endereco.numero')}/>
            {errors.endereco?.numero && (
            <ErrorMessage>{errors.endereco.numero.message}</ErrorMessage>
          )}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input 
              id="campo-bairro" 
              placeholder="Vila Mariana" 
              type="text" 
              $error={!!errors.endereco?.bairro}
              {...register('endereco.bairro')}
            />
            {errors.endereco?.bairro && (
            <ErrorMessage>{errors.endereco.bairro.message}</ErrorMessage>
          )}
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            $error={!!errors.endereco?.localidade}
            {...register('endereco.localidade')}
          />
          {errors.endereco?.localidade && (
            <ErrorMessage>{errors.endereco.localidade.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEspecialistaEndereco;
