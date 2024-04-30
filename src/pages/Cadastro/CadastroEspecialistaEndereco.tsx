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
import { useCallback, useEffect } from "react";
import { supabase } from "../../libs/supabase";

const esquemaCadastroEspecialistaEndereco = z.object({
  endereco: z.object({
    avatar: z.instanceof(FileList).transform(list => list.item(0)!),
    cep: z.string().min(8, 'Informe um CEP válido'),
    rua: z.string().min(1, 'O campo rua é obrigatório.'),
    numero: z.coerce.number().min(1, 'O campo número é obrigatório.'),
    bairro: z.string().min(1, 'O campo bairro é obrigatório.'),
    localidade: z.string().min(1, 'O campo localidade é obrigatório.'),
  })
})

type FormCadastroEspecilistaEndereco = z.infer<typeof esquemaCadastroEspecialistaEndereco>

type TypeEnderecoProps = {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: number,
  gia: number,
  ddd: number,
  siafi: number
}

const CadastroEspecialistaEndereco = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormCadastroEspecilistaEndereco>({
    resolver: zodResolver(esquemaCadastroEspecialistaEndereco),
    defaultValues: {
      endereco: {
        avatar: new File([""], "dummy.jpg", { type: "image/jpeg" }),
        cep: "",
        rua: "",
        numero: 0,
        bairro: "",
        localidade: ""
      }
    }
  })

  console.log(errors)

  const aoSubmeter = async (data: FormCadastroEspecilistaEndereco) => {
    await supabase.storage.from("react-form").upload(data.endereco.avatar.name, data.endereco.avatar);
    console.log(data)
  }

  const handleSetDados = useCallback((data: TypeEnderecoProps) => {
    setValue('endereco.rua', data.logradouro)
    setValue('endereco.bairro', data.bairro)
    setValue('endereco.localidade', data.localidade + ", " + data.uf)
  }, [setValue])

  const buscaEndereco = useCallback(async (cep: string) => {
    const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await result.json();
    handleSetDados(data);
  }, [handleSetDados])

  const cepDigitado = watch('endereco.cep')
  useEffect(() => {
    if (cepDigitado.length !== 8) return;
    buscaEndereco(cepDigitado);
  }, [buscaEndereco, cepDigitado])

  return (
    <>
      <Titulo className="titulo">Para finalizar, só alguns detalhes!</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <>
          <UploadTitulo>Sua foto</UploadTitulo>
          <UploadLabel htmlFor="campo-upload">
            <UploadIcon />
            <UploadDescription>Clique para enviar</UploadDescription>
            <UploadInput
              accept="image/*"
              id="campo-upload"
              type="file"
              {...register('endereco.avatar')}
            />
          </UploadLabel>
          {errors.endereco?.cep && (
            <ErrorMessage>{errors.endereco?.avatar?.message}</ErrorMessage>
          )}
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
              {...register('endereco.numero')} />
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
