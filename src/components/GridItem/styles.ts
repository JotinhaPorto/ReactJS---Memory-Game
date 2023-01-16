import styled from "styled-components";
type ContainerProps ={
    showBackGround : boolean;
}
type IconProps ={
    opacity?: number;
}

export const Container = styled.div<ContainerProps>`
    width: 120px;
    height: 120px;
    border-radius:10px;
    background-color: ${props => props.showBackGround ? '#1650ff' : '#ffffff'};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Icon = styled.img<IconProps>`
    width: 70px;
    opacity: ${props => props.opacity ? props.opacity : '1'};
`