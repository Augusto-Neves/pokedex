import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ParamsProps } from "../@types/pokemonParamsProps";
import { EvolutionCard } from "../components/EvolutionCard";
import { server } from "../service/axios";

interface EvolutionChainResponse {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
        evolves_to: any[];
      }[];
    }[];
  };
}

export function PokemonEvolutionsScreen() {
  const route = useRoute();
  const pokemon = route.params as ParamsProps;
  const [evolutionChain, setEvolutionChain] =
    useState<EvolutionChainResponse | null>(null);

  useEffect(() => {
    (async () => {
      const specieResponse = await server(`pokemon-species/${pokemon.id}`);
      const evolutionUrl = specieResponse.data?.evolution_chain?.url;

      const evolutionChainResponse = await server(evolutionUrl);

      const chain = evolutionChainResponse.data as EvolutionChainResponse;

      setEvolutionChain(chain);
    })();
  }, []);

  return (
    <View className="flex-1 justify-start mt-14 px-6">
      {evolutionChain?.chain.species && (
        <>
          <EvolutionCard
            species={evolutionChain.chain.species}
            key={evolutionChain.chain.species.name}
          />
          {evolutionChain.chain.evolves_to.length > 0 && (
            <>
              {evolutionChain.chain.evolves_to.map((evolution) => {
                return (
                  <View key={evolution.species.name}>
                    <EvolutionCard
                      species={evolution.species}
                      key={evolution.species.name}
                    />
                    {evolution.evolves_to.length > 0 && (
                      <>
                        {evolution.evolves_to.map((evolution) => (
                          <EvolutionCard
                            species={evolution.species}
                            key={evolution.species.name}
                          />
                        ))}
                      </>
                    )}
                  </View>
                );
              })}
            </>
          )}
        </>
      )}
    </View>
  );
}
