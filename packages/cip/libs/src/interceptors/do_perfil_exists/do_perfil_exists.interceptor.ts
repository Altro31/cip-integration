import {CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException} from '@nestjs/common';
import {Neo4jService} from "nest-neo4j/dist";
import {Request} from "express";

export function DoPerfilExistsInterceptor(param_name: string = 'id') {

  @Injectable()
  class DoBlogPerfil implements NestInterceptor {

    neo: Neo4jService

    constructor(neo: Neo4jService) {
      this.neo = neo
    }

    async intercept(context: ExecutionContext, next: CallHandler) {
      const request = context.switchToHttp().getRequest<Request>()
      const perfil_id = request.params[param_name]

      const res = await this.neo.read(`
      MATCH (p: Perfil)
      WHERE elementId(p)="${perfil_id}"
      RETURN p
    `)

      const perfil = res.records[0]?.get('p')

      if (!perfil) throw new NotFoundException(`No se encontro el perfil con id: ${perfil_id}`)

      return next.handle();
    }
  }

  return DoBlogPerfil
}