import styled from "styled-components";

const UserTranslations = ({ translations, removeAllTranslations }) => {
  const displayTranslations = translations.map((t, id) => {
    return (
      <ol key={id}>
        <Li> {t.text} </Li>
      </ol>
    );
  });
  return (
    <ListWrapper>
      {displayTranslations}
      <DeleteBtn onClick={removeAllTranslations}>Clear Translations</DeleteBtn>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  width: 450px;
  margin: auto;
  padding: 20px;
  background-color: #eee;
  margin-top: 20px;

  box-shadow: 0px 2px 18px -6px #000000;
`;

const Li = styled.li`
  list-style-position: outside;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
  margin-right: 20px;
`;

const DeleteBtn = styled.button`
  padding: 20px;
  margin-top: 4rem;
  width: 27rem;
  align-self: center;
  font-size: 17px;
  background: #ef271b;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1.3px;

  :hover {
    background: #fff;
    color: #ef271b;
    border: 1px solid #ef271b;
    font-weight: bold;
  }
`;
export default UserTranslations;
