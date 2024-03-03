import { Grid } from "../../components/reusable";

const LoadingModule: React.FC = () => {
  return (
    <Grid className="grid-cols-2 lg:grid-cols-3">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item key={index} className="animate-pulse bg-neutral-900" />
          );
        })}
    </Grid>
  );
};

export { LoadingModule };
