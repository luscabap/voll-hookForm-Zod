import { z } from "zod"
import { esquemaCadastroEspecialistaEndereco } from "../schemas/esquemaEspecialista"

export type FormCadastroEspecilistaEndereco = z.infer<typeof esquemaCadastroEspecialistaEndereco>

export type TypeEnderecoProps = {
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