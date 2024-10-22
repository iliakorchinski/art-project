import { Header, Container, LinkContainer, Anchor } from './MainNavStyle';

export function MainNav() {
  return (
    <Header>
      <Container>
        <LinkContainer>
          <Anchor to="/">Home</Anchor>
        </LinkContainer>
        <LinkContainer>
          <Anchor to="favourites">Your Favourites</Anchor>
        </LinkContainer>
      </Container>
    </Header>
  );
}
