import styled from 'styled-components';
import { mediaQueries } from '../../style/mediaQueries';

export const PreparationWrap = styled.div`
  margin-top: 100px;
  margin-left: 16px;
  margin-right: 16px;
  ${mediaQueries('tablet')`
    margin-left: 32px;
    margin-right: 32px;
 `}
  ${mediaQueries('desktop')`
    display: flex;
    margin-left: 100px;
    margin-right: 100px;
 `}
`;

export const PreparationSteps = styled.div`
  ${mediaQueries('desktop')`
    flex-grow: 1;
    /* max-width: 757px; */
  `}
`;

export const PreparationHeder = styled.h3`
  color: ${({ theme: { colors } }) => colors.txt};
  font-family: poppins;
  font-weight: 600;
 margin-bottom: 28px;
  ${mediaQueries('tablet')`
    margin-bottom: 32px;
 `}
`;

export const PreparationList = styled.ul`
  list-style-type: none;
  counter-reset: my-counter;
  margin: 0;
  padding: 0;

  li {
    position: relative;
    margin: 0 50px 14px 30px;
    padding-left: 14px;
    line-height: 28px;
    color: ${({ theme: { colors } }) => colors.txt};

    ${mediaQueries('tablet')`
      margin: 0 50px 18px 30px;
   `}

    &::before {
      content: counter(my-counter);
      counter-increment: my-counter;
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: ${({ theme: { colors } }) => colors.accent};
      color: #fff;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
      position: absolute;
      left: -2em;
      top: 0;
    }
  }
  ${mediaQueries('desktop')`
  margin-bottom: 100px;
  `}
`;
export const PreparationImg = styled.img`
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;

  ${mediaQueries('tablet')`
    max-width: 433px;
    max-height: 332px;
    margin: 0;
    margin-bottom: 200px;
 `}
`;
