import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3333/graphql",
  documents: "src/gql/gql/**/*.gql",
  config: {withHooks: true},
  generates: {
    "src/gql/generated.ts": {
      plugins: ['typescript', 'typescript-operations', "typescript-apollo-angular"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
