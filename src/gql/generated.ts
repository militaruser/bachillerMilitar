import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type EncuentroNacionalInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  callePlantel?: InputMaybe<Scalars['String']['input']>;
  coloniaPlantel?: InputMaybe<Scalars['String']['input']>;
  correoContig?: InputMaybe<Scalars['String']['input']>;
  correoPlantel?: InputMaybe<Scalars['String']['input']>;
  disciplina?: InputMaybe<Scalars['String']['input']>;
  estadoPlantel?: InputMaybe<Scalars['String']['input']>;
  fotografia?: InputMaybe<Scalars['String']['input']>;
  idBuscar?: InputMaybe<Scalars['String']['input']>;
  modalidad?: InputMaybe<Scalars['String']['input']>;
  municipioPlantel?: InputMaybe<Scalars['String']['input']>;
  nombreAlumno?: InputMaybe<Scalars['String']['input']>;
  nombreContig?: InputMaybe<Scalars['String']['input']>;
  nombrePlantel?: InputMaybe<Scalars['String']['input']>;
  telefonoContig?: InputMaybe<Scalars['String']['input']>;
  telefonoPlantel?: InputMaybe<Scalars['String']['input']>;
};

export type EncuentroNacionalType = {
  __typename?: 'EncuentroNacionalType';
  _id?: Maybe<Scalars['ID']['output']>;
  callePlantel?: Maybe<Scalars['String']['output']>;
  coloniaPlantel?: Maybe<Scalars['String']['output']>;
  correoContig?: Maybe<Scalars['String']['output']>;
  correoPlantel?: Maybe<Scalars['String']['output']>;
  disciplina?: Maybe<Scalars['String']['output']>;
  estadoPlantel?: Maybe<Scalars['String']['output']>;
  fotografia?: Maybe<Scalars['String']['output']>;
  idBuscar?: Maybe<Scalars['String']['output']>;
  modalidad?: Maybe<Scalars['String']['output']>;
  municipioPlantel?: Maybe<Scalars['String']['output']>;
  nombreAlumno?: Maybe<Scalars['String']['output']>;
  nombreContig?: Maybe<Scalars['String']['output']>;
  nombrePlantel?: Maybe<Scalars['String']['output']>;
  telefonoContig?: Maybe<Scalars['String']['output']>;
  telefonoPlantel?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registro: EncuentroNacionalType;
};


export type MutationRegistroArgs = {
  datos: EncuentroNacionalInput;
};

export type Query = {
  __typename?: 'Query';
  listado?: Maybe<Array<EncuentroNacionalType>>;
};

export type FragRegistroFragment = { __typename?: 'EncuentroNacionalType', _id?: string | null, idBuscar?: string | null, nombrePlantel?: string | null, correoPlantel?: string | null, telefonoPlantel?: string | null, estadoPlantel?: string | null, municipioPlantel?: string | null, callePlantel?: string | null, coloniaPlantel?: string | null, nombreContig?: string | null, correoContig?: string | null, telefonoContig?: string | null, nombreAlumno?: string | null, fotografia?: string | null, disciplina?: string | null, modalidad?: string | null };

export type RegistroMutationVariables = Exact<{
  datos: EncuentroNacionalInput;
}>;


export type RegistroMutation = { __typename?: 'Mutation', registro: { __typename?: 'EncuentroNacionalType', _id?: string | null, idBuscar?: string | null, nombrePlantel?: string | null, correoPlantel?: string | null, telefonoPlantel?: string | null, estadoPlantel?: string | null, municipioPlantel?: string | null, callePlantel?: string | null, coloniaPlantel?: string | null, nombreContig?: string | null, correoContig?: string | null, telefonoContig?: string | null, nombreAlumno?: string | null, fotografia?: string | null, disciplina?: string | null, modalidad?: string | null } };

export type ListadoQueryVariables = Exact<{ [key: string]: never; }>;


export type ListadoQuery = { __typename?: 'Query', listado?: Array<{ __typename?: 'EncuentroNacionalType', _id?: string | null, idBuscar?: string | null, nombrePlantel?: string | null, correoPlantel?: string | null, telefonoPlantel?: string | null, estadoPlantel?: string | null, municipioPlantel?: string | null, callePlantel?: string | null, coloniaPlantel?: string | null, nombreContig?: string | null, correoContig?: string | null, telefonoContig?: string | null, nombreAlumno?: string | null, fotografia?: string | null, disciplina?: string | null, modalidad?: string | null }> | null };

export const FragRegistroFragmentDoc = gql`
    fragment fragRegistro on EncuentroNacionalType {
  _id
  idBuscar
  nombrePlantel
  correoPlantel
  telefonoPlantel
  estadoPlantel
  municipioPlantel
  callePlantel
  coloniaPlantel
  nombreContig
  correoContig
  telefonoContig
  nombreAlumno
  fotografia
  disciplina
  modalidad
}
    `;
export const RegistroDocument = gql`
    mutation registro($datos: EncuentroNacionalInput!) {
  registro(datos: $datos) {
    ...fragRegistro
  }
}
    ${FragRegistroFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegistroGQL extends Apollo.Mutation<RegistroMutation, RegistroMutationVariables> {
    override document = RegistroDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ListadoDocument = gql`
    query listado {
  listado {
    ...fragRegistro
  }
}
    ${FragRegistroFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ListadoGQL extends Apollo.Query<ListadoQuery, ListadoQueryVariables> {
    override document = ListadoDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
