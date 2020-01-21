import React from "react";
import ApiEntry from "../../model/ApiEntry";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 250px;
  height: 200px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px; 
  border-radius: 10px;
  background-color: #2c2c30;
`;

const CardTitle = styled.div`
  color: #b9bbbe;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 600;
`;

type CardProps = {
    apiEntry: ApiEntry;
}

const ApiCard: React.FC<CardProps> = ({apiEntry}) => (
    <Card>
        <CardTitle>
            {
                apiEntry.displayName
            }
        </CardTitle>
    </Card>
);
export default ApiCard;

