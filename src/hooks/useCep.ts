import { useForm } from "react-hook-form";
import { FormCadastroEspecilistaEndereco, TypeEnderecoProps } from "../types/especialistaTipos";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaCadastroEspecialistaEndereco } from "../schemas/esquemaEspecialista";
import { supabase } from "../libs/supabase";
import { useCallback, useEffect } from "react";

const useCep = () => {

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue, 
        watch } = useForm<FormCadastroEspecilistaEndereco>({
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

    return {
        handleSubmit,
        register,
        errors,
        aoSubmeter
    }
}

export default useCep;