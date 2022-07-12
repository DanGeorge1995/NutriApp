import styled from "styled-components";

const Switch = styled.div`
  .switch {
    position: absolute;
    /* bottom: -3rem; */
    /* left: 10.625rem; */
    display: inline-block;
    width: 3.75rem;
    height: 2.125rem;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.toggleBackground};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 2.5rem;
    width: 2.5rem;
    left: 0rem;
    bottom: 0.25rem;
    top: 0;
    bottom: 0;
    margin: auto 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    box-shadow: 0 0px 15px #2020203d;
    background: white url("https://i.ibb.co/7JfqXxB/sunny.png");
    background-repeat: no-repeat;
    background-position: center;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.toggleBackground};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.toggleBackground};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.5rem);
    -ms-transform: translateX(1.5rem);
    transform: translateX(1.5rem);
    background: white url("https://i.ibb.co/FxzBYR9/night.png");
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 2.125rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const ToggleTheme = ({ checked, onChange }) => {
  return (
    <Switch>
      <label id="switch" className="switch">
        <input type="checkbox" id="slider" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </Switch>
  );
};

export default ToggleTheme;
