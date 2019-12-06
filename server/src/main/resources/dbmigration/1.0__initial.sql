-- apply changes
create table api_entry (
  id                            uuid not null,
  display_name                  varchar(45) not null,
  name                          varchar(45) not null,
  description                   varchar(255),
  version                       bigint not null,
  when_created                  timestamptz not null,
  when_modified                 timestamptz not null,
  constraint uq_api_entry_display_name unique (display_name),
  constraint uq_api_entry_name unique (name),
  constraint pk_api_entry primary key (id)
);

create table api_spec (
  id                            uuid not null,
  open_api                      jsonb,
  spec_version                  varchar(255),
  api_entry_id                  uuid not null,
  manually_configured           boolean default false not null,
  version                       bigint not null,
  when_created                  timestamptz not null,
  when_modified                 timestamptz not null,
  constraint pk_api_spec primary key (id)
);

create index ix_api_spec_api_entry_id on api_spec (api_entry_id);
alter table api_spec add constraint fk_api_spec_api_entry_id foreign key (api_entry_id) references api_entry (id) on delete restrict on update restrict;

