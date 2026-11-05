package com.smmasternails.citas.repositorio;

import com.smmasternails.citas.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClienteRepositorio extends JpaRepository<Cliente, Integer> {
}