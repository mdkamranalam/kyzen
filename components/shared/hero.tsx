import Container from "./container";

export default function Hero() {
  return (
    <section className="py-32">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold">
            Build together.
            <br />
            Ship faster.
          </h1>

          <p className="text-muted-foreground mt-6 text-lg">
            AI-powered developer collaboration platform for modern engineering
            teams.
          </p>
        </div>
      </Container>
    </section>
  );
}
