import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <>
      <button className={css.Button} type="button" onClick={evt => {
        onClick();
            }}>

        Load more
      </button>
    </>
  );
};
